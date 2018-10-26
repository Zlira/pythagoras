export default function Scale(range, domain) {
    const rangeLen = range[1] - range[0],
          domainLen = domain[1] - domain[0]
    return value => 
      ((value - domain[0]) / domainLen) * rangeLen + range[0]
}