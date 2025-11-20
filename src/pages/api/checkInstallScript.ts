import { LogLevel, WebClient } from '@slack/web-api'
import type { NextApiRequest, NextApiResponse } from 'next'

const SLACK_BOT_TOKEN = process.env.SLACK_TOKEN
const CHANNEL = process.env.SH_CRON_CHANNEL || 'website-notifications'
const ERROR_MESSAGE =
  ':internet-problems: Could not successfully verify the Install script `curl https://clickhouse.com | sh`'
const SUCCESS_MESSAGE =
  ':tada: ClickHouse curl install working successfully (past 10 minutes)'

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const slack = new WebClient(SLACK_BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.INFO
})

// Post a message to a channel your app is in using ID and message text
async function publishMessage(channelName: string, text: string) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    await slack.chat.postMessage({
      token: SLACK_BOT_TOKEN,
      channel: channelName,
      text: text,
      username: 'Alert-Bot'
    })

    // Print result, which includes information about the message (like TS)
  } catch (error) {
    console.error(error)
  }
}

async function validateScript() {
  const response = await fetch('https://clickhouse.com/', {
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'text.plain',
      'User-Agent': 'curl/7.85.0'
    }
  })

  console.debug('Validating script request')

  if (response.status >= 300) {
    console.debug('publishing error message')
    await publishMessage(CHANNEL, ERROR_MESSAGE)
    console.debug('published error message')
    return true
  }

  const text = await response.text()
  if (text.startsWith('#!/bin/sh -e')) {
    if (new Date().getUTCHours() === 0) {
      console.debug('publishing success message')
      await publishMessage(CHANNEL, SUCCESS_MESSAGE)
      console.debug('published success message')
    }
    return true
  } else {
    console.debug('publishing error message')
    await publishMessage(CHANNEL, ERROR_MESSAGE)
    console.debug('published error message')
    return true
  }
}

interface Data {
  success: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return validateScript()
    .then(() => {
      res.status(200).json({ success: true })
    })
    .catch(() => {
      res.status(400).json({ success: false })
    })
}
