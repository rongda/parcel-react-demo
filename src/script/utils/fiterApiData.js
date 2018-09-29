/* eslint camelcase: 0 */
import { ITEMKEYS, EXTRASID, TYPE38 } from '../config'
import country from '../static/country'

export const fiterDepartment = ({
  business_unit,
  center,
  company,
  team,
  unit
}) => {
  let department = []
  if (company) {
    department.push(company.name)
  }
  if (business_unit) {
    department.push(business_unit.name)
  }
  if (unit) {
    department.push(unit.name)
  }
  if (center) {
    department.push(center.name)
  }
  if (team) {
    department.push(team.name)
  }
  return department.join('/')
}

export const fiterKeyValues = ({
  data,
  associated_instance
}, aggregated_data) => {
  let result = []
  let fiterResult = []
  let combineData = associated_instance ? data.concat(associated_instance) : data
  if (combineData === []) {
    result = []
  } else {
    result = ITEMKEYS.map(item => {
      let value = null
      aggregated_data.some(_item => {
        return _item.source.some(__item => {
          if (__item.input.label === item) {
            combineData.some(dataItem => {
              if (dataItem.id === __item.id) {
                // console.log('__item.input.options', __item.input.options)
                if (__item.input.options && __item.input.options.length > 0) {
                  __item.input.options.some(optionsItem => {
                    if (optionsItem.value === dataItem.input.value[0]) {
                      value = optionsItem.description === '其他' && dataItem.input.value[1] ? dataItem.input.value[1] : optionsItem.description
                      return true
                    }
                  })
                } else {
                  switch (__item.input.type) {
                    case 41:
                      value = dataItem.input.value.join('-').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
                      break
                    case 35:
                      if (__item.input.expression && __item.input.expression.use_1000_separator) {
                        value = dataItem.input.value.join('-').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
                      } else {
                        value = dataItem.input.value.join('-')
                      }
                      break
                    default:
                      value = dataItem.input.value.join('-')
                  }
                }
                return true
              }
            })
            return true
          }
        })
      })
      return {
        key: item,
        value
      }
    })
  }
  result.map(item => item.value !== null ? fiterResult.push({
    [item.key]: item.value
  }) : null)
  return fiterResult
}

const getNodeById = (el, id) => {
  if (el.id === id) {
    return {
      ...el,
      pname: [el.name]
    }
  }
  for (let i = 0; i < el.children.length; i++) {
    const tmp = getNodeById(el.children[i], id)
    if (tmp) {
      return {
        ...tmp,
        pname: [
          el.name,
          ...tmp.pname
        ]
      }
    }
  }
  return null
}

const fiterAddress = id => {
  let pname = getNodeById(country[0], parseInt(id)).pname
  pname.shift() // 删除第一个【中国】
  // console.log(pname)
  return pname.join('/')
}

export const filterReasonTextbox = ({
  progress,
  template
}, id) => {
  // console.log(id)
  // console.log('progress', progress, template)
  let result = null
  let templatesId = null
  progress.some(item => {
    if (item.user.id === id && item.status === 0) {
      templatesId = item.templates[0]
      return true
    }
  })
  // console.log('templatesId', templatesId)
  if (templatesId) {
    template.participants.some(item => {
      if (item.id === templatesId || item.id === templatesId.id) { // 列表页 || 详情页
        result = {
          reason_textbox_visible: item.reason_textbox_visible,
          identity: item.identity
        }
        return true
      }
    })
  }
  // console.log('result', result)
  return result
}

const typeToValue = (type, input, options, expression) => {
  let department = []
  let optionsValue = null
  switch (type) {
    case 9: // 是文件 需要特殊处理可能有多个文件
      return input.file
    case 17: // 是人
      return input.user.name
    case 18: // 是部门
      if (input.department.family.company) {
        department.push(input.department.family.company.name)
      }
      if (input.department.family.business_unit) {
        department.push(input.department.family.business_unit.name)
      }
      if (input.department.family.unit) {
        department.push(input.department.family.unit.name)
      }
      if (input.department.family.center) {
        department.push(input.department.family.center.name)
      }
      if (input.department.family.team) {
        department.push(input.department.family.team.name)
      }
      return department.join('/')
    case 19: // 是岗位名称
      return input.job.name
    case 38: // 负责人类型
      return TYPE38[input.value.join('~')]
    case 42: // 地址
      return fiterAddress(input.value.join('~'))
    case 41: // 金额
      return input.value.join('~').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
    case 35: // 自动计算
      if (expression && expression.use_1000_separator) {
        return input.value.join('~').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
      } else {
        return input.value.join('~')
      }
    case 6:
    case 7:
      options.some(item => {
        if (item.value === input.value[0]) {
          optionsValue = input.value[1] ? input.value[1] : item.description
          return true
        }
      })
      return optionsValue
    default:
      return input.value.join('~')
  }
}
const filterSchedule = data => {
  let scheduleField = []
  data.map(item => {
    item.schedule && item.schedule.columns.map(_item => {
      _item.data.map(__item => {
        data.some(sourceItem => sourceItem.id === __item && scheduleField.push(sourceItem))
      })
    })
  })
  return data.filter(item => !scheduleField.some(_item => item.id === _item.id))
}

export const fiterDetailSource = ({
  associated_instance,
  serial_number,
  user,
  created_datetime,
  data,
  progress,
  template
}, userId) => {
  let itemSource = [
    {
      name: '流水号',
      value: {
        _value: serial_number,
        is_readonly: true,
        is_required: true
      }
    },
    {
      name: '发起人',
      value: {
        _value: user.name,
        is_readonly: true,
        is_required: true
      }
    },
    {
      name: '发起时间',
      value: {
        _value: created_datetime,
        is_readonly: true,
        is_required: true
      }
    }
  ]
  // composeData
  const composeData = data.reduce((init, item) => {
    init[item.id] ? (
      init[item.id][0].input.row < item.input.row ? init[item.id].push(item) : init[item.id].unshift(item)
    ) : init[item.id] = [item]
    return init
  }, {})
  // console.log(composeData)
  // filter schedule data
  const filterTemplateData = filterSchedule(template.data)
  // console.log('filterTemplateData', filterTemplateData)
  filterTemplateData.map(item => {
    if (item.input) {
      itemSource.push({
        name: item.input.label,
        value: {
          id: item.id,
          is_readonly: item.is_readonly,
          is_required: item.is_required,
          _value: composeData[item.id] ? typeToValue(item.input.type, composeData[item.id][0].input, item.input.options, item.input.expression) : null
        }
      })
    } else if (item.schedule) {
      let schedule = []
      let row = 0
      item.schedule.columns.map(columnsItem => { // col
        columnsItem.data.some(_columnsItem => {
          if (composeData[_columnsItem]) {
            (composeData[_columnsItem].length >= row) && (row = composeData[_columnsItem].length)
            return true
          }
        })
      })
      if (row > 0) { // 有值
        for (let i = 0; i < row; i++) {
          schedule[i] = item.schedule.columns.map(columnsItem => {
            let obj = {
              name: columnsItem.name,
              value: {
                id: null,
                is_readonly: true,
                is_required: false,
                _value: null
              }
            }
            columnsItem.data.some(_columnsItem => {
              if (composeData[_columnsItem]) {
                let inputType = null
                let inputId = null
                let inputOptions = null
                let expression = null
                let is_readonly = null
                let is_required = null
                template.data.some(_itemData => {
                  if (_itemData.id === _columnsItem) {
                    inputType = _itemData.input.type
                    inputOptions = _itemData.input.options
                    expression = _itemData.input.expression
                    is_readonly = _itemData.is_readonly
                    is_required = _itemData.is_required
                    inputId = _columnsItem
                    return true
                  }
                })
                composeData[_columnsItem].some(currentItem => {
                  if (currentItem.input.row === i + 1) {
                    obj = {
                      ...obj,
                      value: {
                        id: inputId,
                        is_readonly,
                        is_required,
                        _value: typeToValue(inputType, currentItem.input, inputOptions, expression)
                      }
                    }
                    return true
                  }
                })
                return true
              }
            })
            return obj
          })
        }
      } else {
        schedule[0] = item.schedule.columns.map(columnsItem => {
          let is_readonly = true
          let is_required = false
          let inputId = null
          template.data.some(_itemData => {
            if (columnsItem.data.indexOf(_itemData.id) > -1) {
              is_readonly = _itemData.is_readonly
              is_required = _itemData.is_required
              inputId = _itemData.id
              return true
            }
          })
          return {
            name: columnsItem.name,
            value: {
              id: inputId,
              is_required,
              is_readonly,
              _value: null
            }
          }
        })
      }
      // console.log('row', row)
      // console.log('schedule', schedule)
      itemSource.push({
        name: item.schedule.name,
        schedule
      })
    }
  })
  // console.log('itemSource', itemSource)
  // associated_instance
  if (template.allow_joining) {
    let associatedInstance = {
      follow: template.associated_template.follow,
      associated: []
    }
    if (!template.associated_template.is_required) {
      associatedInstance.associated.push({
        name: '是否关联合同',
        value: associated_instance ? '是' : '否'
      })
    }

    if (associated_instance) {
      associatedInstance.associated.push({
        name: '关联的合同流水号',
        value: associated_instance.serial_number
      })
      associatedInstance.associated = associatedInstance.associated.concat(template.associated_template.data.map(item => {
        let value = null
        associated_instance.data.some(associatedInstanceItem => {
          if (associatedInstanceItem.id === item.id) {
            value = typeToValue(item.input.type, associatedInstanceItem.input, item.input.options, item.input.expression)
            return true
          }
        })
        return {
          name: item.input.label,
          value
        }
      }))
      associatedInstance.name = template.associated_template.name
    }
    // console.log('associatedInstance', associatedInstance)
    // 插入关联合同数据
    const insetItemSource = itemSource.some((item, index) => {
      if (item.value && item.value.id && item.value.id === associatedInstance.follow) {
        itemSource.splice(index + 1, 0, associatedInstance)
        return true
      }
    })
    if (!insetItemSource) {
      itemSource.splice(3, 0, associatedInstance)
    }
  }
  // console.log('all-itemSource', itemSource)
  let _progressSource = progress.map(item => {
    let nodeName = null
    template.participants.some(_item => {
      if (item.templates.length > 0 && _item.id === item.templates[0].id) {
        nodeName = _item.description
        return true
      }
    })
    return {
      status: item.status,
      ordinal: item.ordinal,
      reason: item.reason,
      updated_datetime: item.updated_datetime,
      name: item.user ? item.user.name : '系统',
      id: item.user ? item.user.id : null,
      nodeName
    }
  })
  let progressSource = []
  _progressSource.reduce((preValue, curValue) => {
    preValue.ordinal !== curValue.ordinal ? progressSource.push([curValue]) : progressSource[progressSource.length - 1].push(curValue)
    return curValue
  }, {ordinal: -1})
  // console.log('progressSource', progressSource)
  let isUnApproval = false
  progress.some(item => {
    if (item.status === 0) {
      isUnApproval = item.user && item.user.id === userId
      return true
    }
  })
  const reasonTextbox = filterReasonTextbox({
    progress,
    template
  }, userId)
  return {
    itemSource,
    progressSource,
    isUnApproval,
    reasonTextbox,
    allowRejecting: template.allow_rejecting,
    templateId: template.id,
    associatedInstance: associated_instance
  }
}

export const fiterChoiceSource = data => {
  const fiterById = (data, id) => {
    let _data = [[{description: '全部', value: '-'}]]
    data.some(item => {
      if (item.id === id) { // 报销类型
        let _temp = item.source[0].input.options.map(_item => ({
          description: _item.description,
          value: _item.value
        }))
        _temp.map((item, index) => {
          if (_data[_data.length - 1].length === 2) {
            _data.push([item])
          } else {
            _data[_data.length - 1].push(item)
          }
        })
        return true
      }
    })
    return _data
  }

  return {
    [EXTRASID[0]]: {
      source: fiterById(data, EXTRASID[0]),
      current: {
        value: '-',
        description: '全部'
      }
    },
    [EXTRASID[1]]: {
      source: fiterById(data, EXTRASID[1]),
      current: {
        value: '-',
        description: '全部'
      }
    }
  }
}

export const fiterSearchSource = data => {
  let result = []
  data.map(item => {
    let department = []
    if (item.department.family) {
      const { business_unit, company, unit, center, team } = item.department.family
      if (company) {
        department.push(company.name)
      }
      if (business_unit) {
        department.push(business_unit.name)
      }
      if (unit) {
        department.push(unit.name)
      }
      if (center) {
        department.push(center.name)
      }
      if (team) {
        department.push(team.name)
      }
    }
    result.push({
      id: item.id,
      value: `${item.name}（${item.sn}）${department.join('-')}`
    })
  })
  return result
}
