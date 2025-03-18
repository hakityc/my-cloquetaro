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

export const errorRes = (message: string, data: any = null) => ({
    code: -1,
    message,
    data
})