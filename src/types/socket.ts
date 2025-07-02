import { Socket } from "socket.io";
import { IChatClientEvents, IChatServerEvents } from "../Chat/chat.types";
import { Server as SocketServer } from "socket.io";

import {
	IMessageClientEvents,
	IMessageServerEvents,
} from "../Message/message.types";

export type AppServerEvents = IChatServerEvents & IMessageServerEvents;
export type AppClientEvents = IChatClientEvents & IMessageClientEvents;

export interface SocketData {
	userId: number;
}

export type AuthenticatedSocket = Socket<
	AppClientEvents,
	AppServerEvents,
	{},
	SocketData
>;
export type ServerSocket = SocketServer<
	AppClientEvents,
	AppServerEvents,
	{},
	SocketData
>;
