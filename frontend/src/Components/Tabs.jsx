

export default Tabs = ({ children }) => {

    return (
        <div className="tabs">
            {children}
            <div className="tab-indicator"></div>
        </div>
    );
}