//

import ChatService from "../services/ChatService.js";

// ----------------------------------------------

class ChatController {
  async createPrompt(req, res, next) {
    console.log("===");

    try {
      const execution = await ChatService.createPrompt(req.body);

      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Transfer-Encoding", "chunked");

      for await (const event of execution.stream) {
        switch (event.type) {
          case "token":
            console.log("===", event.content);

            res.write(event.content);
            break;

          case "error":
            throw new Error(event.message);

          default:
            break;
        }
      }

      const result = await execution.complete();

      console.log(result);

      res.end();
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();
