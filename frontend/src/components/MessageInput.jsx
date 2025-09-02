import { useRef, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { Image, SendIcon } from "lucide-react"

export default function MessageInput() {
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

    const { sendMessage } = useChatStore()

    const fileInputRef = useRef(null)


    const handleImageChange = (e) => {

    }

    const removeImg = (e) => {

    }

    const handleSendMsg = (e) => {

    }
    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            {/* view images */}
            <form onSubmit={handleSendMsg} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        placeholder="Type a message..."
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button type="button" className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}>
                        <Image size={20} />
                    </button>
                    <div>
                        <button type="submit" className="btn btn-sm btn-circle" disabled={!text.trim() && !imagePreview}>
                            <SendIcon />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}