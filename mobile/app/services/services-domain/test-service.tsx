import { ErrorResponseDto } from "../../dto/ErrorResponseDto";
import HotPocketClientService from "./../hp-client-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TestService {

    private constructor() {
    }

    public static getInstance(): TestService {
        return new TestService();
    }

    public async getChallngesByUser() {
        const messageService = 'Test';
        const messageAction = 'Test2';

        const message = {
            Service: messageService,
            Action: messageAction,
        }

        try {
            const response: any = await HotPocketClientService.submitInputToContract(message);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}