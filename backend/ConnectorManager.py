import asyncio


class ConnectionManager:
    def __init__(self):
        self.connections = []

    async def connect(self):
        q = asyncio.Queue()
        self.connections.append(q)
        return q

    def disconnect(self, q):
        if q in self.connections:
            self.connections.remove(q)

    async def broadcast(self, data):
        for q in self.connections:
            await q.put(data)
