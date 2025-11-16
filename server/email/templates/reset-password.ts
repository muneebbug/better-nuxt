import { User } from 'better-auth'
import mjml2html from 'mjml'

const options = {
  minify: true
}

export const resetPassword = async (url: string, user: User) => {

  const htmlOutput = await mjml2html(`
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial" padding="0" />
      <mj-text padding="0 24px" color="#000000" font-size="15px" line-height="1.6" />
      <mj-button background-color="#000000" color="#ffffff" font-weight="600" border-radius="8px" padding="14px 28px" />
      <mj-section padding="0" />
      <mj-column padding="0" />
      <mj-class name="muted" color="#444444" />
      <mj-style inline="inline">
        .card { border-radius: 12px; border: 1px solid #e5e5e5; }
        a { text-decoration: underline; color: #000 !important; }
      </mj-style>
    </mj-head>

    <mj-body background-color="#ffffff">

      <!-- Preheader -->
      <mj-section padding="12px 0 0 0">
        <mj-column>
          <mj-text css-class="muted" font-size="12px">
            Reset your Better Nuxt account password.
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- Main -->
      <mj-section padding="32px 16px">
        <mj-column width="100%">
          <mj-wrapper css-class="card" padding="32px" background-color="#ffffff">

            <!-- Brand -->
            <mj-section padding="0">
              <mj-column>
                <mj-text font-size="18px" font-weight="700" padding="0 0 4px 0">
                  Better Nuxt
                </mj-text>
                <mj-text css-class="muted" font-size="13px" padding="0 0 16px 0">
                  Build better. Build faster.
                </mj-text>
              </mj-column>
            </mj-section>

            <!-- Greeting -->
            <mj-section padding="0">
              <mj-column>
                <mj-text font-size="20px" font-weight="600" padding="12px 0 6px 0">
                  Hey ${user.name},
                </mj-text>
                <mj-text css-class="muted" padding="0 0 20px 0">
                  You requested to reset your password. Click the button below to set a new one.
                </mj-text>
              </mj-column>
            </mj-section>

            <!-- Button -->
            <mj-section padding="0 0 20px 0">
              <mj-column>
                <mj-button href="${url}" font-size="15px">
                  Reset Password
                </mj-button>

                <mj-text css-class="muted" font-size="13px" padding="16px 0 0 0">
                  If the button doesn't work, copy this link:
                  <br />
                  <a href="${url}" target="_blank" style="word-break: break-all;">${url}</a>
                </mj-text>
              </mj-column>
            </mj-section>

            <!-- Divider -->
            <mj-section padding="24px 0 0 0">
              <mj-column>
                <mj-divider border-color="#e5e5e5" border-width="1px" />
              </mj-column>
            </mj-section>

            <!-- Footer -->
            <mj-section padding="16px 0 0 0">
              <mj-column>
                <mj-text css-class="muted" font-size="13px">
                  — The Better Nuxt Team
                </mj-text>
              </mj-column>
            </mj-section>

          </mj-wrapper>

          <!-- Footer Links -->
          <mj-section padding="20px 0 0 0">
            <mj-column>
              <mj-text align="center" font-size="12px" css-class="muted">
                GitHub: <a href="https://github.com/muneebbug/better-nuxt">Better Nuxt Repo</a>
              </mj-text>
              <mj-text align="center" css-class="muted" font-size="11px" padding="8px 24px 0 24px">
                © ${new Date().getFullYear()} Better Nuxt. All rights reserved.
              </mj-text>
            </mj-column>
          </mj-section>

        </mj-column>
      </mj-section>

    </mj-body>
</mjml>
    `, options)

  return htmlOutput.html
}
