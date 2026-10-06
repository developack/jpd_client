import { useState, useRef, useEffect } from "react"
import { Button } from "./button"
import { Eye, EyeOff } from "lucide-react"
import type { ExpandableTextProps } from "@/types/component.types"


export const ExpandableText = ({ className, text }: ExpandableTextProps) => {
    const [expanded, setExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const contentElement = useRef<HTMLParagraphElement>(null)

    const handleToggle = () => {
        setExpanded((prev) => !prev)
    }

    useEffect(() => {
        const element = contentElement.current
        if (!element) return
        setIsOverflowing(element.scrollHeight > 200)
    }, [text])

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <p className={`${!expanded && "max-h-[200px]"}`} ref={contentElement}>{text}</p>

            {isOverflowing && (
                <>
                    {!expanded && (
                        <div>
                            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-surface to-transparent" />
                            <div className="absolute inset-x-0 bottom-4 flex justify-center">
                                <Button onClick={handleToggle} variant="secondary">
                                    <Eye className="size-5" />
                                    ادامه مطلب
                                </Button>
                            </div>
                        </div>
                    )}

                    {expanded && (
                        <div className="flex justify-center pt-4">
                            <Button onClick={handleToggle} variant="secondary">
                                <EyeOff className="size-5" />
                                بستن
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}