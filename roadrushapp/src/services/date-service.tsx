import { format, parseISO } from 'date-fns';

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

    public getThemedTimeStamp(date: any) {
        const parsedTimeStamp = parseISO(date);
        const formattedDate = format(parsedTimeStamp, 'dd MMM yyyy');
        const formattedTime = format(parsedTimeStamp, 'h:mm a');
        return `${formattedDate} ${formattedTime}`;
    }
}