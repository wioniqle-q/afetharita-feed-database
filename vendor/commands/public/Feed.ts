import { BotClient } from './../../lib/Client';
import { Command } from "../../public/BaseCommand";
import axios, {isCancel, AxiosError} from 'axios';
import type * as DJS from "discord.js";

export default abstract class BaseCommand extends Command {
    constructor({ bot }: { bot: BotClient; }) {
        super(bot, {
            name: "feed",
            description: "feed"
        });
    }

    public override async execute(_bot: BotClient, _message: DJS.Message, ..._args: unknown[]) {
        const _messageContent = _args[0] as string;

        let httpBody = {
            content: _messageContent
        };

        await axios.post("", httpBody, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            console.log(response.data);
            return _message.channel.send(response.status + " " + response.statusText);
        }).catch((error: AxiosError) => {
            if (isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.log("Error", error);
            }
        });
    }
}