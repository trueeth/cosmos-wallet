
export enum ETransaction {
    unstake = "unstake",
    stake = "stake",
    extend = "extend",
    receive = "receive",
}

export type TActivity = {
    type: ETransaction;
    status: string;
    amount: number;
}

