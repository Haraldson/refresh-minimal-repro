export const compact = (array = []) => array
    .filter(value => (!!value || value === 0))