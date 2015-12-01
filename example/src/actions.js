// Action
export const UPDATE_GREETING = "UPDATE_GREETING";

// Action creator

export function updateGreeting(greeting) {
    return {
        type: UPDATE_GREETING,
        greeting
    }
}

