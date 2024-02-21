import { format } from 'date-fns';

export default class DateService {
    private static instance: DateService;

    public static getInstance(): DateService {
        if (!DateService.instance) {
            DateService.instance = new DateService();
        }
        return DateService.instance;
    }

    /**
     * 
     * @param date 
     * @returns 13 Oct 2023
     */
    public getThemedDate(date: any) {
        return format(new Date(date), 'dd MMM yyyy');
    }
}