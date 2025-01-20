export const reactSelectStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: '#1f2937',
        borderColor: '#4B5563',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#1f2937',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#374151' : '#1f2937',
        color: 'white',
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#374151',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: 'white',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: 'white',
        ':hover': {
            backgroundColor: '#4B5563',
        },
    }),
};