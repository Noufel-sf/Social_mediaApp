import { mockDb } from "./mockDb";

type EventHandler = (...args: any[]) => void;

class MockSocket {
  public id: string = "mock_sock_" + Math.random().toString(36).substring(7);
  public connected: boolean = true;
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private currentUserId: string = "";

  constructor(userId: string) {
    this.currentUserId = userId;
    // Simulate connection event
    setTimeout(() => {
      this.trigger("connect");
    }, 50);
  }

  public on(event: string, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  public off(event: string, handler?: EventHandler): void {
    if (!handler) {
      this.listeners.delete(event);
      return;
    }
    this.listeners.get(event)?.delete(handler);
  }

  public emit(event: string, ...args: any[]): void {
    console.log(`[Mock Socket] 📡 EMIT "${event}"`, args);

    if (event === "request_online_users") {
      const friends = mockDb.getFriends(this.currentUserId);
      const onlineIds = friends.map((f) => f._id);
      setTimeout(() => {
        this.trigger("online_users", onlineIds);
      }, 50);
      return;
    }

    if (event === "private_message") {
      const payload = args[0] as { receiverId: string; text: string };
      if (!payload || !payload.receiverId || !payload.text) return;

      const newMsg = mockDb.addMessage(
        this.currentUserId,
        payload.receiverId,
        payload.text
      );

      // Trigger message_sent and private_message immediately
      setTimeout(() => {
        this.trigger("message_sent", newMsg);
        this.trigger("private_message", newMsg);
      }, 30);

      // Simulate a realistic auto-reply from the friend after 1.5 seconds!
      setTimeout(() => {
        const replies = [
          "That sounds awesome! 🙌",
          "Got it, thanks for updating me! 👍",
          "Haha definitely agree with that!",
          "Great job on this web app, it looks super sleek! ✨",
          "Catch you a bit later, busy coding right now 💻",
          "Received! Let's catch up tomorrow.",
        ];
        const randomReply =
          replies[Math.floor(Math.random() * replies.length)];

        const replyMsg = mockDb.addMessage(
          payload.receiverId,
          this.currentUserId,
          randomReply
        );

        this.trigger("private_message", replyMsg);
      }, 1500);
      return;
    }

    // Default trigger for any other event
    this.trigger(event, ...args);
  }

  public trigger(event: string, ...args: any[]): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(...args);
        } catch (e) {
          console.error(`[Mock Socket] Error in handler for event "${event}":`, e);
        }
      });
    }
  }

  public disconnect(): void {
    this.connected = false;
    this.listeners.clear();
    console.log("🔌 Mock Socket disconnected");
  }
}

let activeSocket: MockSocket | null = null;

export const connectSocket = (userId: string): MockSocket => {
  if (!activeSocket) {
    activeSocket = new MockSocket(userId);
    console.log("✅ Mock Socket connected:", activeSocket.id);
  }
  return activeSocket;
};

export const disconnectSocket = (): void => {
  if (activeSocket) {
    activeSocket.disconnect();
    activeSocket = null;
  }
};

export const getSocket = (): MockSocket | null => activeSocket;

export default { connectSocket, disconnectSocket, getSocket };
