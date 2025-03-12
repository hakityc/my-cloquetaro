export const okRes = <T>(data: T) => {
    return {
        code: '200',
        message: '',
        data,
    } as {
        code: string,
        message: string,
        data: T
    }
};