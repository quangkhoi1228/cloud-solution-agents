import asyncio
import json
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from ConnectorManager import ConnectionManager
from tradingagents.graph.cloud_solution_agent_graph import CloudSolutionAgentsGraph
import os
from langchain_core.messages import HumanMessage, AIMessage, messages_to_dict, messages_from_dict

from dotenv import load_dotenv
load_dotenv()  # Mặc định tìm file .env ở thư mục hiện tại


app = FastAPI()
manager = ConnectionManager()
graph_app = CloudSolutionAgentsGraph(debug=True)

async def fake_stream():
    for i in range(5):
        yield {"messages": [HumanMessage(content=f"Chunk {i}")] }
        await asyncio.sleep(1)





def get_return_data(data):
    messages = messages_to_dict(data.get("messages", []))
    return_data = {
        "messages": messages,
        "next": data.get("next"),
        "user_requirements": data.get("user_requirements"),
        "folder_path": data.get("folder_path"),
        "final_proposal": data.get("final_proposal"),
        "final_proposal_parts": data.get("final_proposal_parts"),
        "solution_architect_report": data.get("solution_architect_report"),
        "project_manager_report": data.get("project_manager_report"),
        "sale_report": data.get("sale_report"),
        "delivery_manager_report": data.get("delivery_manager_report"),
        "final_acceptance": data.get("final_acceptance")
    }

    return return_data

@app.post("/run_graph1")
async def run_graph(body: dict):
    user_req = body.get("user_requirements")

    async def _run():
        for i in range(10):
            chunk = {
                "messages": [AIMessage(content=f"Chunk {i}")],
                "next": "StepX",
                "user_requirements": user_req,
                "folder_path": "/abc",
                "final_proposal": "",
                "solution_architect_report": "something",
                "project_manager_report": "something",
                "sale_report": "",
                "delivery_manager_report": "",
                "final_acceptance": False,
            }
            await manager.broadcast(get_return_data(chunk))
            print("📤 broadcasted", i)
            await asyncio.sleep(1)

    asyncio.create_task(_run())
    return {"status": "running"}

@app.post("/run_graph")
async def run_graph(body: dict):
    user_req = body.get("user_requirements")
    init_agent_state = graph_app.propagator.create_initial_state(user_req)
    args = graph_app.propagator.get_graph_args()

    async def _run():

        async for chunk in graph_app.graph.astream(init_agent_state,  **args):
            if 'next' in chunk:
                # print("chunk:", chunk)
                await manager.broadcast(get_return_data(chunk))
                print("next: ", chunk["next"])
        print("✅ Done streaming")

    asyncio.create_task(_run())  # không block request
    return {"status": "running"}


@app.get("/sse")
async def sse(request: Request):
    q = await manager.connect()

    async def event_gen():
        try:
            while True:
                if await request.is_disconnected():
                    break

                try:
                    data = await asyncio.wait_for(q.get(), timeout=1.0)
                except asyncio.TimeoutError:
                    continue

                print("📡 Sending chunk:", data)

                return_data = json.dumps(data, ensure_ascii=False)

                yield f"data: {return_data}\n\n"
                await asyncio.sleep(0.1)
        finally:
            manager.disconnect(q)

    return StreamingResponse(event_gen(), media_type="text/event-stream; charset=utf-8")
