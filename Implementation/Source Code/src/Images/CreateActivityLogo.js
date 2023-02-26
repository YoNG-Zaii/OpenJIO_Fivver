const CreateActivityLogo = () => {
    return (
        <svg className='caLogo' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="url(#createactivitylogo)"/>
            <defs>
                <pattern id="createactivitylogo" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_62_200" transform="scale(0.03125)"/>
                </pattern>
                <image id="image0_62_200" width="32" height="32" href="data:image/png;base64,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"/>
            </defs>
        </svg>
    )
}

export default CreateActivityLogo