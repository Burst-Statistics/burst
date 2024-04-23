import {__} from '@wordpress/i18n';
import {useRef} from '@wordpress/element';
import {toast} from "react-toastify";
const CodeBlock = ({ children }) => {
    const codeRef = useRef(null);

    const handleClick = (e) => {
        if (codeRef.current) {
            const range = document.createRange();
            range.selectNodeContents(codeRef.current);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        let snippet  = e.target.innerText;
        console.log(snippet);
        navigator.clipboard.writeText(snippet);
        toast.success(__('Snippet copied to clipboard', 'burst-statistics'));
    };

    return (
        <code ref={codeRef} onClick={(e) => handleClick(e) }>
            {children}
        </code>
    );
};

export default CodeBlock;