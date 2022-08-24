import { injectable } from 'inversify'

@injectable()
export class DiscordMarkdown {
    bold = (text: string) => `**${text}**`

    italic = (text: string) => `*${text}*`

    underline = (text: string) => `__${text}__`

    strikeThrough = (text: string) => `~~${text}~~`

    singleLineCodeBlock = (text: string) => `\`${text}\``

    multiLineCodeBlock = (text: string) => `\`\`\`${text}\`\`\``

    singleLineBlockQuote = (text: string) => `\>${text}`

    multiLineBlockQuote = (text: string) => `\>\>\>${text}`
}
