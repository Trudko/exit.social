export const getUSDString = (value: number, showMinimumFractionDigits = false, maximumFractionDigits = 2) =>
    value
        .toLocaleString("en-US", {
            currency: "USD",
            minimumFractionDigits: showMinimumFractionDigits ? 2 : undefined,
            maximumFractionDigits: maximumFractionDigits
        })
        .replace(/,/g, " ");

export const getETHString = (value: number) =>
    value
        .toLocaleString("en-US", {
            maximumFractionDigits: 4
        })
        .replace(/,/g, " ");

export const round = (num: number, pow: number = 2) => {
    return Math.round((num + Number.EPSILON) * Math.pow(10, pow)) / Math.pow(10, pow);
};