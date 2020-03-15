function format_date(date) {    
    let Y = date.getFullYear() +  '-';

            
    let  M = (date.getMonth() + 1 < 10 ?  '0' + (date.getMonth() + 1) : date.getMonth() + 1) +  '-';

            
    let  D = date.getDate() +  ' ';

            
    let  h = date.getHours() +  ':';

            
    let  m = date.getMinutes() +  ':';

            
    let  s = date.getSeconds();

            
    return  Y + M + D + h + m + s;

}

export function  timestampToTime(timestamp) {

            
    let   date =  new  Date(timestamp * 1000);
    return format_date(date)

        
}


export function formatDatetime(time_string) {
    let date = new Date(time_string)
    return format_date(date)
}