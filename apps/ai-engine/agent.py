from typing import TypedDict

class State(TypedDict):
    query: str
    context: str

def CodebaseContextualizer(state: State) -> State:
    return {**state, "context": "Dummy codebase context"}
