export const getFileExtension = (file) => file.split('.').at(1).toLocaleLowerCase();

export default getFileExtension;
