import { v4 as uuidv4 } from "uuid";

class Specification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4(); // responsabilidade de criar o id é da classem, não da rota
    }
  }
}

export { Specification };
