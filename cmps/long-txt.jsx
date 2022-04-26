export function LongText({text, isLongTextShown, onToggle}) {
    const readMore = () => {

        return <div className="readMore">
            {!isLongTextShown ? text.slice(0, 30) : text}
            <a onClick={onToggle} className="read-or-hide"><span>
            {!isLongTextShown ? "...read more" : " read less"}
            </span>
            </a>
        </div>
    }

    return <div className="more-less">
            <h4>
                {readMore()}
            </h4>
        </div>
}