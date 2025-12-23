import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hand, Trophy, ArrowRight, Sparkles, Globe, Zap } from 'lucide-react';
import { GESTURE_CATEGORIES } from '../utils/gestures';

function HomePage() {
  const features = [
    {
      icon: Hand,
      title: '实时手势识别',
      description: '基于 MediaPipe 的浏览器端 AI 识别，无需安装任何软件',
      color: 'bg-teal-100 text-teal-600',
    },
    {
      icon: Zap,
      title: '边缘计算加速',
      description: '阿里云 ESA 边缘节点提供毫秒级响应，全球低延迟访问',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: Globe,
      title: '无障碍设计',
      description: '专为听障人士和手语学习者设计，让沟通无界限',
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  const gestureEmojis = ['👍', '✌️', '🖐️', '👌', '🤘', '☝️'];

  return (
    <main style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(to bottom, #f0fdfa, #fafaf9)',
        padding: '3rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* 左侧文字 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#ccfbf1',
                color: '#0f766e',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '1.5rem'
              }}>
                <Sparkles style={{ width: '1rem', height: '1rem' }} />
                <span>AI 驱动的手语学习平台</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                color: '#1c1917',
                lineHeight: 1.2,
                marginBottom: '1.5rem'
              }}>
                用双手说话
                <br />
                <span style={{ color: '#0f766e' }}>让世界听见</span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: '#57534e',
                marginBottom: '2rem',
                lineHeight: 1.7,
                maxWidth: '500px'
              }}>
                SignLingo 是一款基于浏览器的手语学习工具。通过摄像头实时识别您的手势，提供即时反馈，让手语学习变得简单有趣。
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/practice" className="btn-primary">
                  <span>开始练习</span>
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </Link>
                <Link to="/progress" className="btn-secondary">
                  <Trophy style={{ width: '1rem', height: '1rem' }} />
                  <span>查看进度</span>
                </Link>
              </div>
            </motion.div>

            {/* 右侧手势展示 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                maxWidth: '320px',
                width: '100%'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem'
                }}>
                  {gestureEmojis.map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      style={{
                        aspectRatio: '1',
                        background: 'linear-gradient(135deg, #fafaf9, #f5f5f4)',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <p style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: '#78716c'
                }}>
                  支持多种常用手势识别
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '1rem'
            }}>
              为什么选择 SignLingo
            </h2>
            <p style={{ color: '#57534e', maxWidth: '600px', margin: '0 auto' }}>
              结合前沿 AI 技术与边缘计算，为您提供流畅、准确的手语学习体验
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#fafaf9',
                  borderRadius: '1rem',
                  padding: '2rem'
                }}
              >
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  background: feature.color.includes('teal') ? '#ccfbf1' :
                             feature.color.includes('amber') ? '#fef3c7' : '#dbeafe',
                  color: feature.color.includes('teal') ? '#0f766e' :
                         feature.color.includes('amber') ? '#d97706' : '#2563eb'
                }}>
                  <feature.icon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#1c1917',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#57534e', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '4rem 0', background: '#fafaf9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '1rem'
            }}>
              学习内容
            </h2>
            <p style={{ color: '#57534e' }}>
              从基础数字到日常交流，循序渐进掌握手语
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {Object.values(GESTURE_CATEGORIES).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#1c1917'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#78716c' }}>
                        {category.nameEn}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    background: '#ccfbf1',
                    color: '#0f766e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                  }}>
                    {category.gestures.length} 个手势
                  </span>
                </div>
                <p style={{ color: '#57534e', marginBottom: '1rem', lineHeight: 1.6 }}>
                  {category.description}
                </p>
                <Link
                  to={`/practice?category=${category.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#0f766e',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  <span>开始学习</span>
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #0f766e, #14b8a6)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem'
          }}>
            准备好开始学习了吗？
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.125rem',
            marginBottom: '2rem'
          }}>
            只需一个摄像头，即可开始您的手语学习之旅
          </p>
          <Link
            to="/practice"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'white',
              color: '#0f766e',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <Hand style={{ width: '1.25rem', height: '1.25rem' }} />
            <span>立即开始</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
