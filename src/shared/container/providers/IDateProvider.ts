interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date; // pra retornar o now de acordo com a biblioteca
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
