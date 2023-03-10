import { CheckCircleIcon, ClipboardCopyIcon } from "@heroicons/react/outline"
import React, { FC } from "react"
import useCopyClipboard from "../../hooks/useCopyClipboard"
import { classNames } from "../../functions"
import Typography from "../Typography"

interface CopyHelperProps {
    className?: string
    toCopy: string
    children?: React.ReactNode
}

const CopyHelper: FC<CopyHelperProps> = ({ className, toCopy, children }) => {
    const [isCopied, setCopied] = useCopyClipboard()

    return (
        <div
            className={classNames(
                "flex items-center justify-between flex-shrink-0 space-x-1 no-underline cursor-pointer whitespace-nowrap hover:no-underline focus:no-underline active:no-underline text-yellow opacity-80 hover:opacity-100 focus:opacity-100",
                className
            )}
            onClick={() => setCopied(toCopy)}
        >
            {isCopied && (
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <Typography variant="sm">{`Copied`}</Typography>
                    <CheckCircleIcon width={16} height={16} />
                </div>
            )}

            {!isCopied && (
                <>
                    {children}
                    <ClipboardCopyIcon width={16} height={16} />
                </>
            )}
        </div>
    )
}

export default CopyHelper
