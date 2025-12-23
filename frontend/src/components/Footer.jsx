import { Github, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer style={{
      background: '#f5f5f4',
      borderTop: '1px solid #e7e5e4',
      padding: '1.5rem 0',
      marginTop: 'auto'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* 主要内容 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Logo和标语 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#57534e'
          }}>
            <span style={{ fontWeight: 500 }}>SignLingo</span>
            <span style={{ color: '#d6d3d1' }}>|</span>
            <span>让手语学习更简单</span>
          </div>

          {/* 链接 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#78716c',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Powered by</span>
              <a
                href="https://www.aliyun.com/product/esa"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0d9488',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                阿里云 ESA
              </a>
            </span>
            <span style={{ color: '#d6d3d1' }}>|</span>
            <a
              href="https://github.com/1195214305/SignLingo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: '#78716c',
                textDecoration: 'none'
              }}
            >
              <Github style={{ width: '1rem', height: '1rem' }} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Made with love */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.875rem',
            color: '#78716c'
          }}>
            <span>Made with</span>
            <Heart style={{ width: '0.875rem', height: '0.875rem', color: '#ef4444', fill: '#ef4444' }} />
            <span>for accessibility</span>
          </div>
        </div>

        {/* 底部说明 */}
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e7e5e4',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#a8a29e',
            lineHeight: 1.6,
            margin: 0
          }}>
            本项目使用 MediaPipe 进行手势识别，旨在帮助听障人士和手语学习者
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: '#a8a29e',
            marginTop: '0.25rem'
          }}>
            © 2025 SignLingo · 阿里云 ESA Pages 边缘开发大赛参赛作品
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
