export interface ITest {
    id?: string;
    quession: string;

    test_answer?:ITestAnswer[]
}

export interface ITestAnswer {
    id?: string;
    answer: string;
    isTrue: boolean;
    testId: string;
}