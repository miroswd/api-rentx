interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  avatar: string;
  driver_license: string;
  avatar_url(): string; // função q retorna uma string
}

export { IUserResponseDTO };
