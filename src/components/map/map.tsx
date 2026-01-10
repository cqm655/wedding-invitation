const Map = () => {
    return (<div style={{width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden'}}>
        <iframe
            title="Locatie nunta"
            src="https://www.google.com/maps?q=47.0105,28.8638&z=15&output=embed"
            width="100%"
            height="100%"
            style={{border: 0}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    </div>)
}

export default Map;