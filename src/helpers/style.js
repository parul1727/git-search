export const buildSelectStyle = (component) => ({
    container: (base, state) => ({
        ...base,
        marginTop: '32px',
    }),
    control: (base, state) => ({
        ...base,
        width: '100%',
        minHeight: '38px',
        height: 'auto',
        outline: '0 !important',
        background: '#FFFFFF !important',
        boxShadow: 'none !important',
        borderColor: '#FFFFFF !important'
    }),
    group: (base) => ({
        ...base,
        padding: 0,
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'noWrap'
    }),
    menu: (base) => ({
        ...base,
        color: '#758196',
        border: '0',
        boxShadow: 'none',
        marginTop: '4px',
    }),
    menuList: (base) => ({
        ...base,
        borderRadius: '4px',
        border: '1px solid hsl(0,0%,80%)',
        boxShadow: '0 1px 2px 0 rgba(10,31,68,0.12)',
        padding: '4px 0'
    }),
    option: (base, state) => ({
        ...base,
        width: 'auto',
        maxWidth: '100%',
        background: 'white !important',
        fontWeight: 'normal',
        padding: '8px 16px',
        fontSize: 14,
        textAlign: 'left',
        color: '#353B48',
        whiteSpace: 'pre',
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'default'
    }),
    singleValue: (base, state) => ({
        ...base,
        fontSize: 14,
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        backgroundColor: '#FFFFFF !important',
    }),
    valueContainer: (base) => ({
        ...base,
        width: '200px',
        lineHeight: '24px',
        padding: '0 8px',
    }),
})
