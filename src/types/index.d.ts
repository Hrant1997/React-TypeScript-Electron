export {};

declare global {
    interface Window { api: Api; }
}

window.api = window.api || {};

interface Api {
    getReadme: () => void,
    createReadme: () => void,
    updateReadme: (data: string) => void,
    handleReadme: (callback: (arg: string) => void) => void
    handleReadmeNotFound: (callback: () => void) => void
}