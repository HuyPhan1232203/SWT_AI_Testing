import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();
require('./heal');
export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium', // Vẫn giữ là 'chromium' vì Edge dựa trên Chromium
      channel: 'msedge', // Sử dụng kênh Edge
      // url: 'http://localhost',
      url: 'https://example.com/',
      show: true
    },
    AI:{
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'Lab',

  ai: {
    request: async (messages) => {
      const OpenAI = require('openai');
      const openai = new OpenAI({
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages,
      });

      return completion?.choices[0]?.message?.content;
    }
  },
  plugins: {
    heal: {
      enabled: true
    }
  }
}
