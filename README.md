# Google Ads - OpenAI Integration

This project integrates the Google Ads API with OpenAI's GPT-4 to generate campaign optimization suggestions based on campaign performance data.

## Features

- Retrieves campaign data from Google Ads.
- Generates optimization suggestions using OpenAI's GPT-4.
- Logs operations and errors for monitoring and debugging.

## Installation

To set up your local development environment:

```bash
git clone https://github.com/endcycles/google-ads-gpt.git
cd google-ads-gpt
npm install
```

## Configuration

Create a .env file in the root directory with the following content:

```makefile
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DEVELOPER_TOKEN=your-google-developer-token
CUSTOMER_ID=your-google-ads-customer-id
REFRESH_TOKEN=your-google-ads-refresh-token
OPENAI_API_KEY=your-openai-api-key
```



## Usage

Run the script with:

```bash
node index.js
```

Contributing

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.

## Disclaimer

This project is not affiliated with Google or OpenAI.


**LICENSE:**

```plaintext
MIT License

Copyright (c) 2023 FastMVP.net

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```