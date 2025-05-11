"use client";
import React, {
	useState,
	useRef,
	useEffect,
	MouseEvent,
	FormEvent,
} from "react";
import {
	Smile,
	Send,
	X,
	Paperclip,
	Settings,
	Moon,
	Sun,
	Bell,
	Globe,
	Lock,
	HelpCircle,
	User,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"; // Import the icon you want to use
import {
	faMagnifyingGlass,
	faUsersViewfinder,
	faUsers,
	faRobot,
	faUser,
	faGear,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
	return <InitialPage />;
};


const InitialPage: React.FC = () => {
	const [showMainPage, setShowMainPage] = useState<boolean>(false);

	const handleLogin = (): void => {
		console.log("Login button clicked");
		setShowMainPage(true);
	};

	if (showMainPage) {
		return <MainConverse />;
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-sans">
			<div className="flex flex-col items-center justify-center w-full max-w-md text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					Welcome to <span className="text-purple-600">The ConVerse</span>
				</h1>
				<p className="text-gray-500 text-lg mb-8">
					Your gateway to connection and conversation
				</p>
				<button
					onClick={handleLogin}
					className="bg-purple-600 text-white font-medium rounded-xl px-12 py-3 text-xl cursor-pointer">
					Login
				</button>
			</div>
		</div>
	);
};
type ChatUser = {
	id: number;
	name: string;
	// Add other user-related fields as needed
};

const MainConverse: React.FC = () => {
	const [isLeftExpanded, setIsLeftExpanded] = useState<boolean>(false);
	const [rightWidth, setRightWidth] = useState<number>(300);
	const [activeChat, setActiveChat] = useState<ChatUser | null>(null);
	const [isRightExpanded, setIsRightExpanded] = useState<boolean>(false);
	const [rightPaneContent, setRightPaneContent] = useState<string | null>(null);
	const [showInitialPage, setShowInitialPage] = useState<boolean>(false);

	const isDragging = useRef<boolean>(false);
	const startX = useRef<number>(0);
	const startWidth = useRef<number>(0);

	const toggleLeftSidebar = () => {
		setIsLeftExpanded((prev) => !prev);
	};

	const toggleRightSidebar = () => {
		setIsRightExpanded((prev) => !prev);
		if (isRightExpanded) setRightPaneContent(null);
	};

	const onDividerDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
		isDragging.current = true;
		startX.current = e.clientX;
		startWidth.current = rightWidth;
		e.preventDefault();

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};

	const onMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
		if (isDragging.current) {
			const deltaX = e.clientX - startX.current;
			setRightWidth(Math.max(0, startWidth.current + deltaX));
		}
	};

	const onMouseUp = () => {
		isDragging.current = false;
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	};

	const handleLogout = () => {
		console.log("Login button clicked");
		setShowInitialPage(true);
	};

	if (showInitialPage) {
		return <InitialPage />;
	}

	const openContactInfo = () => {
		console.log("Executing openContactInfo");
		setRightPaneContent("contactInfo");
		setIsRightExpanded(true);

		if (rightWidth === 0) {
			setRightWidth(300);
		}
	};

	return (
		<div className="flex h-screen w-full overflow-hidden font-sans bg-[#0b061d]">
			{/* Left Navbar */}
			<div className="flex flex-col items-center w-14 bg-[#0b061d] text-white">
				<AppLogo />
				<div className="flex flex-col items-center w-14 mt-2.5">
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						onClick={toggleLeftSidebar}
						title="All Chats">
						<FontAwesomeIcon icon={faRocketchat} className="text-[#dedede]" />
					</div>
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						title="User Stories"
						onClick={toggleRightSidebar}>
						<FontAwesomeIcon
							icon={faUsersViewfinder}
							className="text-[#dedede]"
						/>
					</div>
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						title="Communities">
						<FontAwesomeIcon icon={faUsers} className="text-[#dedede]" />
					</div>
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						title="AI Chat"
						onClick={toggleRightSidebar}>
						<FontAwesomeIcon icon={faRobot} className="text-[#dedede]" />
					</div>
				</div>
				<div className="flex flex-col items-center w-14 mt-24">
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						title="My Profile">
						<FontAwesomeIcon icon={faUser} className="text-[#dedede]" />
					</div>
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						title="Settings">
						<FontAwesomeIcon icon={faGear} className="text-[#dedede]" />
					</div>
					<div
						className="flex flex-col text-xl py-5 px-5 hover:cursor-pointer hover:bg-[#3b3170]"
						title="Logout"
						onClick={handleLogout}>
						<FontAwesomeIcon icon={faArrowLeft} className="text-[#dedede]" />
					</div>
				</div>
			</div>

			{/* Chat Pane */}
			<div
				className={`flex flex-col my-2 rounded-lg bg-[#f6f8fb] transition-all duration-300 ${
					isLeftExpanded
						? "w-[430px] transition-all duration-200 ease-in"
						: "w-0 p-0 overflow-hidden"
				}`}>
				<ChatsPane setActiveChat={setActiveChat} />
			</div>

			<div className="flex h-screen w-full overflow-hidden font-sans bg-[#0b061d]">
				{/* Center Area */}
				<div className="flex flex-1 justify-center items-center mx-1 my-2 rounded-lg bg-[#f6f8fb] text-gray-800">
					{activeChat ? (
						<SingleUserChatSpace
							activeChat={activeChat}
							openContactInfo={openContactInfo}
						/>
					) : (
						<div className="text-center">
							<p>Select a chat to start messaging</p>
						</div>
					)}
				</div>

				{/* Divider */}
				<div
					className="w-1 cursor-ew-resize bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
					onDoubleClick={onDividerDoubleClick}
					title="Double-click, then drag to resize"
				/>

				{/* Right Pane */}
				<div
					className={`relative bg-white border-l border-gray-300 text-gray-800 mx-1 my-2 rounded-lg transition-all duration-300 ${
						isRightExpanded ? "overflow-y-auto" : "w-0 p-0 overflow-hidden"
					}`}
					style={{ width: isRightExpanded ? rightWidth : 0 }}>
					{isRightExpanded &&
						rightPaneContent === "contactInfo" &&
						activeChat && <ContactInfo user={activeChat} />}
				</div>
			</div>
		</div>
	);
};

const AppLogo = () => {
	return (
		<div className="flex items-center mt-2">
			<svg
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-9 h-9 transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3">
				<circle cx="32" cy="32" r="30" fill="#a259ff" />
				<path
					d="M20 24C20 20.6863 22.6863 18 26 18H38C41.3137 18 44 20.6863 44 24V32C44 35.3137 41.3137 38 38 38H30L24 44V38H26C22.6863 38 20 35.3137 20 32V24Z"
					fill="white"
				/>
			</svg>
		</div>
	);
};

type Question = {
	name: string;
	handle: string;
	timeAgo: string;
	question: string;
	avatar: string;
};

type ChatsPaneProps = {
	setActiveChat: (chat: Question) => void;
};

const ChatsPane: React.FC<ChatsPaneProps> = ({ setActiveChat }) => {
	const pendingQuestions: Question[] = [
		{
			name: "Phoenix Baker",
			handle: "phoenix",
			timeAgo: "5min ago",
			question: "What are the requirements for opening a new store?",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		},
		{
			name: "Noah Smith",
			handle: "noahs",
			timeAgo: "10min ago",
			question:
				"What legal documents are necessary for expanding to another state?",
			avatar: "https://randomuser.me/api/portraits/men/52.jpg",
		},
		{
			name: "Sophia Lenn",
			handle: "sophial",
			timeAgo: "30min ago",
			question:
				"How can I integrate loyalty programs into the checkout process?",
			avatar: "https://randomuser.me/api/portraits/women/23.jpg",
		},
		{
			name: "Liam Johnson",
			handle: "liamj",
			timeAgo: "1hr ago",
			question: "How do I optimize my store layout for better customer flow?",
			avatar: "https://randomuser.me/api/portraits/men/78.jpg",
		},
		{
			name: "Amelia Watson",
			handle: "amelia",
			timeAgo: "2hr ago",
			question: "What is the best way to promote seasonal sales?",
			avatar: "https://randomuser.me/api/portraits/women/65.jpg",
		},
		{
			name: "Koray Okumus",
			handle: "koray",
			timeAgo: "4hr ago",
			question: "How do I manage inventory effectively?",
			avatar: "https://randomuser.me/api/portraits/men/45.jpg",
		},
	];

	const handleChatSelect = (chat: Question) => {
		setActiveChat(chat);
	};

	return (
		<>
			{/* Search bar area */}
			<div className="px-5 py-3 border-b border-gray-200">
				<div className="flex items-center w-full h-8 rounded-lg bg-purple-100">
					<FontAwesomeIcon className="px-1 mx-1" icon={faMagnifyingGlass} />
					<input
						className="h-6 text-sm rounded-lg border-none bg-purple-100 focus:outline-none"
						placeholder="Search"
					/>
				</div>
				<div className="flex items-center w-full mt-1 mr-2 bg-purple-100 rounded-md">
					<div className="flex justify-center items-center w-10 h-5 text-xs rounded-md bg-purple-100 mx-0.5 hover:cursor-pointer hover:bg-purple-200">
						All
					</div>
					<div className="flex justify-center items-center w-15 h-5 text-xs rounded-md bg-purple-100 mx-0.5 hover:cursor-pointer hover:bg-purple-200">
						Unread
					</div>
					<div className="flex justify-center items-center w-15 h-5 text-xs rounded-md bg-purple-100 mx-0.5 hover:cursor-pointer hover:bg-purple-200">
						Groups
					</div>
					<div className="flex justify-center items-center w-15 h-5 text-xs rounded-md bg-purple-100 mx-0.5 hover:cursor-pointer hover:bg-purple-200">
						Archieve
					</div>
				</div>
			</div>
			{/* Chat list */}
			<div className="flex-1 overflow-y-auto">
				<div className="flex flex-col mt-2">
					{pendingQuestions.map((q) => (
						<div
							key={q.name}
							className="flex p-1 px-1 h-17 border-b-2 border-gray-100 hover:bg-purple-100 hover:cursor-pointer"
							onClick={() => handleChatSelect(q)}>
							<div className="relative ml-1 cursor-pointer">
								<img
									src={q.avatar}
									alt={q.name}
									className="w-11 h-11 mt-0.5 rounded-full"
								/>
								<span className="absolute bottom-3 right-1 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
							</div>
							<div className="flex flex-col w-64 px-1 pr-2.5 pl-1">
								<div className="flex">
									<div className="flex flex-col w-44 items-start ml-2 mt-1 cursor-pointer">
										<div className="text-xs font-bold">{q.name}</div>
									</div>
									<div className="flex justify-end w-16 text-xs text-gray-500 mt-1.5 ml-2">
										{q.timeAgo}
									</div>
								</div>
								<div className="flex">
									<div className="mt-1 ml-2 text-xs text-gray-600 max-w-52 truncate">
										{q.question}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

type Message = {
	id: number;
	text: string;
	sender: "user" | "other";
	reactions: Record<string, number>;
};

type ActiveChat = {
	avatar: string;
	name: string;
	question: string;
};

type SingleUserChatSpaceProps = {
	activeChat: ActiveChat | null;
	openContactInfo: () => void;
};

const SingleUserChatSpace: React.FC<SingleUserChatSpaceProps> = ({
	activeChat,
	openContactInfo,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			text: "Hey there! Important news!",
			sender: "other",
			reactions: {},
		},
		{
			id: 2,
			text: "Our intern @jchurch has successfully completed his probationary period and is now part of our team!",
			sender: "other",
			reactions: {},
		},
		{
			id: 3,
			text: "Jaden, my congratulations! I will be glad to work with you on a new project 😊",
			sender: "user",
			reactions: {},
		},
		{
			id: 4,
			text: "Thanks! Excited to be officially on board 🚀",
			sender: "other",
			reactions: {},
		},
		{
			id: 5,
			text: "You're going to do great. Let's schedule a kickoff call tomorrow?",
			sender: "user",
			reactions: {},
		},
		{
			id: 6,
			text: "Sounds perfect. Morning or afternoon works for me.",
			sender: "other",
			reactions: {},
		},
		{
			id: 7,
			text: "Let's go with 10 AM then. I'll send a calendar invite shortly.",
			sender: "user",
			reactions: {},
		},
	]);

	const [newMessage, setNewMessage] = useState<string>("");
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
	const [showReactionPicker, setShowReactionPicker] = useState<number | null>(
		null
	);

	const messageInputRef = useRef<HTMLInputElement | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);
	const cursorPosition = useRef<number>(0);
	const messageCountRef = useRef<number>(messages.length);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const emojis: string[] = [
		"😊",
		"😂",
		"👍",
		"❤️",
		"🎉",
		"👏",
		"🙌",
		"🔥",
		"✨",
		"🤔",
		"😍",
		"🥰",
		"😘",
		"😎",
		"🙄",
		"😢",
		"😭",
		"😱",
		"🤯",
		"😴",
		"🤮",
		"😡",
		"🤬",
		"👌",
		"✌️",
		"👋",
		"💪",
		"🙏",
		"💯",
		"⭐",
	];

	useEffect(() => {
		if (activeChat) {
			setMessages((prevMessages) => [
				{
					id: 1,
					text: activeChat.question,
					sender: "user",
					reactions: {},
				},
				...prevMessages.slice(1),
			]);
		}
	}, [activeChat]);

	useEffect(() => {
		if (messages.length > messageCountRef.current) {
			if (messagesContainerRef.current) {
				messagesContainerRef.current.scrollTop =
					messagesContainerRef.current.scrollHeight;
			}
			messageCountRef.current = messages.length;
		}
	}, [messages]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownOpen &&
				!(event.target as HTMLElement).closest(".header-actions")
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownOpen]);

	const handleInputFocus = () => {
		if (messageInputRef.current) {
			cursorPosition.current = messageInputRef.current.selectionStart ?? 0;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);
		cursorPosition.current = e.target.selectionStart ?? 0;
	};

	const addEmojiToInput = (emoji: string) => {
		const start = cursorPosition.current;
		const newText =
			newMessage.slice(0, start) + emoji + newMessage.slice(start);
		setNewMessage(newText);
		setShowEmojiPicker(false);

		setTimeout(() => {
			if (messageInputRef.current) {
				messageInputRef.current.focus();
				messageInputRef.current.selectionStart = start + emoji.length;
				messageInputRef.current.selectionEnd = start + emoji.length;
				cursorPosition.current = start + emoji.length;
			}
		}, 0);
	};

	const getReactionPickerStyle = (messageId: number): React.CSSProperties => {
		const message = messages.find((m) => m.id === messageId);
		if (!message) return {};

		const messageIndex = messages.findIndex((m) => m.id === messageId);
		const isTopThird = messageIndex < Math.ceil(messages.length / 3);

		const style: React.CSSProperties = {};

		if (isTopThird) {
			style.top = "100%";
			style.marginTop = "8px";
		} else {
			style.bottom = "100%";
			style.marginBottom = "8px";
		}

		if (message.sender === "user") {
			style.right = "30px";
		} else {
			style.left = "90px";
		}

		return style;
	};

	const addReactionToMessage = (messageId: number, emoji: string) => {
		setMessages(
			messages.map((message) => {
				if (message.id === messageId) {
					const newReactions = { [emoji]: 1 };
					return { ...message, reactions: newReactions };
				}
				return message;
			})
		);
		setShowReactionPicker(null);
	};

	const removeReactionFromMessage = (messageId: number, emoji: string) => {
		setMessages(
			messages.map((message) => {
				if (message.id === messageId) {
					const newReactions: Record<string, number> = {};
					return { ...message, reactions: newReactions };
				}
				return message;
			})
		);
	};

	const sendMessage = () => {
		if (newMessage.trim()) {
			setMessages([
				...messages,
				{
					id: messages.length + 1,
					text: newMessage,
					sender: "user",
					reactions: {},
				},
			]);
			setNewMessage("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	const handleOptionClick = (option: "contact" | "clear") => {
		setDropdownOpen(false);
		if (option === "contact") {
			openContactInfo();
		} else if (option === "clear") {
			setMessages([]);
		}
	};

	return (
		<>
			<div className="flex flex-col h-full w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-md relative">
				<div className="flex items-center relative p-2 bg-white border-b border-gray-200">
					<div className="flex items-center">
						<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
							{activeChat ? (
								<img
									src={activeChat.avatar}
									alt={activeChat.name}
									className="w-10 h-10 rounded-full"
								/>
							) : (
								<span className="text-gray-600 font-medium">A</span>
							)}
						</div>
						<div className="ml-3">
							<div className="font-semibold text-gray-800">
								{activeChat ? activeChat.name : "Alex Hunt"}
							</div>
							<div className="text-xs text-green-500">online</div>
						</div>
					</div>
					<div className="ml-auto flex gap-3 header-actions">
						<button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
							<svg
								className="w-5 h-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
						</button>
						<button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
							<svg
								className="w-5 h-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
							</svg>
						</button>
						<button
							className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
							onClick={toggleDropdown}>
							<svg
								className="w-5 h-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</button>
					</div>
				</div>
				{dropdownOpen && (
					<div className="absolute top-12 right-2 mt-1 flex flex-col bg-white border border-gray-200 rounded-md shadow-md min-w-[150px] z-10">
						<div
							className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
							onClick={() => handleOptionClick("contact")}>
							Contact Info
						</div>
						<div
							className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
							onClick={() => handleOptionClick("clear")}>
							Clear Chat
						</div>
					</div>
				)}

				{/* Messages */}
				<div
					className="flex-1 p-4 overflow-y-auto bg-gray-50"
					ref={messagesContainerRef}>
					<div className="flex flex-col gap-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`relative transition-all duration-200 group ${
									message.sender === "user" ? "self-end" : "self-start"
								}`}>
								<div className="flex items-start relative">
									{message.sender !== "user" && (
										<div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
											{activeChat ? (
												<img
													src={activeChat.avatar}
													alt={activeChat.name}
													className="w-8 h-8 rounded-full"
												/>
											) : (
												<span className="text-gray-600 text-xs">A</span>
											)}
										</div>
									)}
									<div
										className={`relative max-w-[320px] p-3 rounded-2xl break-words ${
											message.sender === "user"
												? "bg-purple-600 text-white"
												: "bg-white text-gray-800 border border-gray-200"
										}`}>
										{message.text}

										{/* Reaction button */}
										<button
											onClick={() =>
												setShowReactionPicker(
													showReactionPicker === message.id ? null : message.id
												)
											}
											className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-9 h-9 rounded-full flex items-center justify-center z-10 cursor-pointer"
											style={{
												[message.sender === "user" ? "left" : "right"]: "-32px",
												top: "50%",
												transform: "translateY(-50%)",
											}}>
											<Smile className="w-5 h-5 text-gray-500 bg-gray-50 rounded-full p-0.5" />
										</button>
									</div>
								</div>

								{/* Message metadata and reactions in one line */}
								<div className="flex items-center">
									<div
										className={`flex items-center mt-1 text-xs text-gray-500 ${
											message.sender === "user"
												? "justify-end"
												: "justify-start ml-10"
										}`}>
										<span>
											{message.sender === "user"
												? "09:27"
												: message.id === 1
												? "05:20"
												: "09:24"}
										</span>
										<span className="ml-2">Seen</span>
									</div>

									{/* Reactions display */}
									{Object.keys(message.reactions).length > 0 && (
										<div className="flex ml-2 gap-1">
											{Object.entries(message.reactions).map(([emoji]) => (
												<button
													key={emoji}
													onClick={() =>
														removeReactionFromMessage(message.id, emoji)
													}
													className="bg-gray-100 px-2 py-1 rounded-2xl text-xs cursor-pointer transition-colors hover:bg-gray-200 flex items-center">
													<span>{emoji}</span>
												</button>
											))}
										</div>
									)}
								</div>

								{/* Emoji picker for reactions - with dynamic positioning */}
								{showReactionPicker === message.id && (
									<div
										className="absolute bg-white rounded-lg shadow-lg p-2 z-10"
										style={getReactionPickerStyle(message.id)}>
										<div className="flex flex-wrap gap-2 w-[280px] max-h-[160px] overflow-y-auto">
											{emojis.map((emoji) => (
												<button
													key={emoji}
													onClick={() =>
														addReactionToMessage(message.id, emoji)
													}
													className="p-2 text-lg cursor-pointer rounded hover:bg-gray-100 transition-colors">
													{emoji}
												</button>
											))}
										</div>
										<button
											className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1 flex items-center justify-center cursor-pointer shadow"
											onClick={() => setShowReactionPicker(null)}>
											<X className="w-3 h-3" />
										</button>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Message input */}
				<div className="p-3 bg-white border-t border-gray-200">
					<div className="relative flex items-center">
						{/* File attachment button */}
						<button className="p-2 hover:text-gray-700 transition-colors">
							<Paperclip className="w-6 h-6 text-gray-500" />
						</button>

						{/* Emoji picker button */}
						<button
							onClick={() => setShowEmojiPicker(!showEmojiPicker)}
							className="p-2 hover:text-gray-700 transition-colors cursor-pointer">
							<Smile className="w-6 h-6 text-gray-500" />
						</button>

						{/* Message input */}
						<input
							ref={messageInputRef}
							type="text"
							value={newMessage}
							onChange={handleInputChange}
							onFocus={handleInputFocus}
							onClick={handleInputFocus}
							onKeyPress={handleKeyPress}
							placeholder="Your message"
							className="flex-1 mx-2 py-2 px-4 rounded-full bg-gray-100 border-none text-sm focus:outline-none focus:bg-gray-200"
						/>

						{/* Send button */}
						<button
							onClick={sendMessage}
							className="p-2 hover:text-purple-700 transition-colors">
							<Send className="w-6 h-6 text-gray-500" />
						</button>

						{/* Emoji picker */}
						{showEmojiPicker && (
							<div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 z-10">
								<div className="flex flex-wrap gap-2 w-[280px] max-h-[160px] overflow-y-auto">
									{emojis.map((emoji) => (
										<button
											key={emoji}
											onClick={() => addEmojiToInput(emoji)}
											className="p-2 text-lg cursor-pointer rounded hover:bg-gray-100 transition-colors">
											{emoji}
										</button>
									))}
								</div>
								<button
									className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1 flex items-center justify-center cursor-pointer shadow"
									onClick={() => setShowEmojiPicker(false)}>
									<X className="w-3 h-3" />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

const GroupChatSpace = () => {
	const [newMessage, setNewMessage] = useState("");

	const messages = [
		{
			id: 1,
			text: "What are the requirements for opening a new store?",
			time: "09:27",
			status: "Seen",
			isCurrentUser: true,
		},
		{
			id: 2,
			text: "Our intern @jchurch has successfully completed his probationary period and is now part of our team!",
			time: "09:24",
			status: "Seen",
			isCurrentUser: false,
		},
		{
			id: 3,
			text: "Jaden, my congratulations! I will be glad to work with you on a new project 😊",
			time: "09:27",
			status: "Seen",
			isCurrentUser: true,
		},
		{
			id: 4,
			text: "Thanks! Excited to be officially on board 🚀",
			time: "09:28",
			status: "Seen",
			isCurrentUser: false,
		},
	];

	const handleSubmit = (e) => {
		if (e) e.preventDefault();
		// Add message sending logic here
		setNewMessage("");
	};

	return (
		<div className="flex flex-col h-screen bg-white">
			{/* Header */}
			<div className="flex items-center justify-between p-3 border-b border-gray-200">
				<div className="flex items-center">
					<div className="relative">
						<img
							src="/api/placeholder/40/40"
							alt="Profile"
							className="w-10 h-10 rounded-full"
						/>
						<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
					</div>
					<div className="ml-3">
						<h1 className="text-lg font-semibold">Phoenix Baker</h1>
						<p className="text-sm text-green-500">online</p>
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<button className="text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<button className="text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
					</button>
					<button className="text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Messages Container */}
			<div className="flex-1 p-4 overflow-y-auto space-y-4">
				{messages.map((message) => (
					<div key={message.id} className="flex flex-col">
						<div
							className={`flex ${
								message.isCurrentUser ? "justify-end" : "justify-start"
							}`}>
							{!message.isCurrentUser && (
								<div className="mr-2">
									<img
										src="/api/placeholder/36/36"
										alt="Avatar"
										className="w-9 h-9 rounded-full"
									/>
								</div>
							)}
							<div
								className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl ${
									message.isCurrentUser
										? "bg-purple-600 text-white"
										: "bg-white text-gray-800 border border-gray-200"
								}`}>
								<p className="text-sm">{message.text}</p>
							</div>
						</div>
						<div
							className={`flex mt-1 text-xs text-gray-500 ${
								message.isCurrentUser ? "justify-end" : "justify-start"
							}`}>
							<span>{message.time}</span>
							<span className="ml-2">{message.status}</span>
						</div>
					</div>
				))}
			</div>

			{/* Message Input */}
			<div className="p-3 border-t border-gray-200 bg-gray-50">
				<div className="flex items-center rounded-full bg-white p-1">
					<button className="p-2 text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
							/>
						</svg>
					</button>
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Your message"
						className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-600"
					/>
					<button className="p-2 text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
					<button onClick={handleSubmit} className="p-2 text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}


function SettingsPanel() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("general");
	const [darkMode, setDarkMode] = useState(false);
	const panelRef = useRef(null);

	// Close panel when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target) &&
				!event.target.closest(".settings-icon-wrapper")
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Toggle settings panel
	const toggleSettings = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			{/* Settings Icon in Nav */}
			<div
				className="settings-icon-wrapper flex items-center justify-center w-12 h-12 rounded-full hover:bg-purple-700 cursor-pointer transition-colors duration-200"
				onClick={toggleSettings}>
				<Settings className="text-white" size={24} />
			</div>

			{/* Settings Panel */}
			{isOpen && (
				<div
					ref={panelRef}
					className="absolute left-16 bottom-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
					style={{ transform: "translateY(-50%)" }}>
					{/* Header */}
					<div className="flex items-center justify-between px-4 py-3 bg-purple-600 text-white">
						<h2 className="text-lg font-medium">Settings</h2>
						<button
							onClick={() => setIsOpen(false)}
							className="p-1 rounded-full hover:bg-purple-700 transition-colors">
							<X size={20} />
						</button>
					</div>

					{/* Tabs */}
					<div className="flex border-b border-gray-200 dark:border-gray-700">
						<button
							className={`px-4 py-2 flex-1 text-sm font-medium ${
								activeTab === "general"
									? "text-purple-600 border-b-2 border-purple-600"
									: "text-gray-500"
							}`}
							onClick={() => setActiveTab("general")}>
							General
						</button>
						<button
							className={`px-4 py-2 flex-1 text-sm font-medium ${
								activeTab === "account"
									? "text-purple-600 border-b-2 border-purple-600"
									: "text-gray-500"
							}`}
							onClick={() => setActiveTab("account")}>
							Account
						</button>
						<button
							className={`px-4 py-2 flex-1 text-sm font-medium ${
								activeTab === "privacy"
									? "text-purple-600 border-b-2 border-purple-600"
									: "text-gray-500"
							}`}
							onClick={() => setActiveTab("privacy")}>
							Privacy
						</button>
					</div>

					{/* Content */}
					<div className="p-4">
						{activeTab === "general" && (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										{darkMode ? (
											<Moon size={18} className="mr-2 text-purple-500" />
										) : (
											<Sun size={18} className="mr-2 text-yellow-500" />
										)}
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Dark Mode
										</span>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="sr-only peer"
											checked={darkMode}
											onChange={() => setDarkMode(!darkMode)}
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
									</label>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Bell size={18} className="mr-2 text-blue-500" />
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Notifications
										</span>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="sr-only peer"
											defaultChecked
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
									</label>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Globe size={18} className="mr-2 text-green-500" />
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Language
										</span>
									</div>
									<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
										<option value="en">English</option>
										<option value="es">Spanish</option>
										<option value="fr">French</option>
										<option value="de">German</option>
									</select>
								</div>
							</div>
						)}

						{activeTab === "account" && (
							<div className="space-y-4">
								<div className="flex items-center">
									<User size={18} className="mr-2 text-indigo-500" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Profile Settings
									</span>
								</div>
								<div className="pl-6 space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-500">Username</span>
										<span className="text-sm font-medium">user2025</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-500">Email</span>
										<span className="text-sm font-medium">
											user@example.com
										</span>
									</div>
									<button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
										Edit Profile
									</button>
								</div>
							</div>
						)}

						{activeTab === "privacy" && (
							<div className="space-y-4">
								<div className="flex items-center">
									<Lock size={18} className="mr-2 text-red-500" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Privacy Settings
									</span>
								</div>
								<div className="pl-6 space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-500">
											Data Collection
										</span>
										<label className="relative inline-flex items-center cursor-pointer">
											<input type="checkbox" className="sr-only peer" />
											<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-500"></div>
										</label>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-500">
											Activity Status
										</span>
										<label className="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												className="sr-only peer"
												defaultChecked
											/>
											<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-purple-500"></div>
										</label>
									</div>
									<button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
										Clear All Data
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="p-3 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
						<div className="flex items-center text-xs text-gray-500">
							<HelpCircle size={14} className="mr-1" />
							<a href="#" className="hover:text-purple-600 transition-colors">
								Help Center
							</a>
						</div>
						<button className="px-3 py-1 text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors">
							Save Changes
						</button>
					</div>
				</div>
			)}

			{/* Demo background to show the component in context */}
			<div className="fixed inset-0 -z-10 flex items-center justify-center">
				<div className="text-gray-300 text-lg">
					{isOpen ? "Settings panel is open" : "Click the settings icon"}
				</div>
			</div>
		</div>
	);
}

type User = {
	name: string;
	avatar: string;
	email?: string;
	phone?: string;
	handle: string;
};

type ContactInfoProps = {
	user?: User;
};

const ContactInfo = ({ user }) => {
	console.log("Entering ContactInfo with user ==== ", user);
	if (!user) return null;

	return (
		<div className="h-full w-full overflow-y-auto flex flex-col bg-white">
			<div className="flex justify-between items-center mb-5">
				<h2>Contact Info</h2>
				<button className="bg-transparent border-none cursor-pointer rounded-full p-1.5 hover:bg-gray-100">
					<X size={18} />
				</button>
			</div>

			<div className="flex flex-col items-center mb-6">
				<div className="relative w-24 h-24 mb-3">
					<img
						src={user.avatar}
						alt={user.name}
						className="w-full h-full rounded-full object-cover"
					/>
					<span className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
				</div>
				<h3 className="m-0 mb-1 text-lg">{user.name}</h3>
				<p className="m-0 text-green-500 text-sm">Online</p>
			</div>

			<div className="flex flex-col gap-6">
				<div className="contact-section">
					<h4 className="m-0 mb-3 text-base text-gray-600">Contact Details</h4>
					<div className="flex mb-2 text-sm">
						<div className="w-20 text-gray-500">Email:</div>
						<div className="flex-1">
							{user.email || `${user.handle.toLowerCase()}@example.com`}
						</div>
					</div>
					<div className="flex mb-2 text-sm">
						<div className="w-20 text-gray-500">Phone:</div>
						<div className="flex-1">{user.phone || "+1 (555) 123-4567"}</div>
					</div>
					<div className="flex mb-2 text-sm">
						<div className="w-20 text-gray-500">Username:</div>
						<div className="flex-1">@{user.handle}</div>
					</div>
				</div>

				<div className="contact-section">
					<h4 className="m-0 mb-3 text-base text-gray-600">Media and Files</h4>
					<div>
						<div className="grid grid-cols-2 gap-2 mb-2">
							<div className="h-20 bg-gray-100 rounded-lg"></div>
							<div className="h-20 bg-gray-100 rounded-lg"></div>
							<div className="h-20 bg-gray-100 rounded-lg"></div>
							<div className="h-20 bg-gray-100 rounded-lg"></div>
						</div>
						<button className="block w-full py-2 bg-transparent border-none text-purple-600 cursor-pointer font-medium text-center hover:bg-purple-50 rounded">
							View all
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};


export default Home;
