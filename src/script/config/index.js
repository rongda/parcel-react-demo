export const CATEGORY = 2
export const pageSize = 10
export const token = 'T0KEN'
export const codemark = 'Code'
export const tokenmark = 'Token'
export const EXTRASID = [23, 24]
export const pathname = '/loading'
export const apiserver = process.env.api
export const oaservice = process.env.oaservice
export const ITEMKEYS = [
  '报销类型',
  '合计金额',
  '合同金额',
  '合同类型',
  '盖章主体',
  '文件种类',
  '开票主体',
  '开票金额'
]
export const PROCESSESSTATUS = {
  1: '审批中',
  2: '审批中',
  3: '审批中',
  4: '已通过',
  5: '已拒绝',
  6: '已通过',
  8: '审批中'
}
export const TYPE38 = {
  0: '无',
  1: '公司负责人',
  2: '事业部负责人',
  3: '部门负责人',
  4: '中心负责人',
  5: '小组负责人'
}
export const mapCurrentPathToApi = {
  '/todo': 'getTodo',
  '/completed': 'getCompleted',
  '/copyme': 'getCopyme'
}

export const mapCurrentPathToNotice = {
  '/todo': '暂无待审批的单子',
  '/completed': '暂无已完成事项的单子',
  '/copyme': '暂无抄送我的单子'
}
