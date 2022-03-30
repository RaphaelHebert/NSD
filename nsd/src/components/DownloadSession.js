const DownloadSession = ({data, number}) => {
    return(
        <>
            <div>
               key: {number}
            </div>
            <div>
                data: {Object.keys(data).map(key => {
                    return <div>{data[key]} </div>
                })}
            </div>
        </>
    )
}

export default DownloadSession;