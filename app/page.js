'use client';
import { useAppContext } from '../components/context';
import Link from 'next/link';

const i18n = {
  en: {
    welcome: 'Welcome to Demo for Bank B',
    title: 'Scenario',
    demo: 'Try Demo',
    scenario: 'Bank B manages the customer\'s assets and issues the capital verification report when requested.Participants could complete the verification without providing each other with critical data such as the loan amount or customer assets.',
    detail: 'Scenario Details',
    detailURL: 'http://localhost:1314/demo/',
  },
  cn: {
    welcome: '欢迎访问B银行演示系统',
    title: '演示说明',
    demo: '开始体验',
    scenario: 'B银行记录客户资产状况，根据验资请求对客户的资产能力出具验证结果。参与双方无需相互提供贷款金额或者资产情况等关键业务数据，即可完成审批，有效促进组织间协作。',
    detail: '场景详情',
    detailURL: 'http://localhost:1313/demo/',
  }
}

function HomePage() {
  const { lang, version } = useAppContext();
  const texts = i18n[lang];
  return (
    <div className='container'>
      <div className='row justify-content-center p-5'>
        <div className='col-2'>
        </div>
        <div className='col-8'>
          <div className="card" style={{ width: '18 rem' }}>
            <div className="card-header">
              {texts.welcome + ' ' + version}
            </div>
            <div className="card-body">
              <h5 className="card-title">{texts.title}</h5>
              <p className="card-text">{texts.scenario}</p>
              <div className='d-flex'>
                <a href="/forms/" className="btn btn-primary mx-3">{texts.demo}</a>
                <a href={texts.detailURL} className="btn btn-outline-primary mx-3">{texts.detail}</a>
              </div>

            </div>
          </div>

        </div>
        <div className='col-2' />
      </div>
    </div>
  )
}

export default HomePage
