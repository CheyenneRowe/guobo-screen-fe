import { PromiseServiceReq } from '@src/app/utils/req';
import {edgesMock} from "./mock";

// 获取拓扑图数据
const getTopoData = (processId: string) => {
    // return PromiseServiceReq.GET(`/api/fcaps/v1/esm`, {});
    return new Promise(resolve => {
        let result = edgesMock;
        resolve(result);
    })
};

export { getTopoData };
