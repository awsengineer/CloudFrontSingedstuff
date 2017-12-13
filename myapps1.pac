var ipv4addr = /^(0|10|127|192\.168|172\.1[6789]|172\.2[0-9]|172\.3[01]|169\.254|192\.88\.99|192\.0\.2)\.[0-9.]+$/;

// destinations
//var INTERNET = "DIRECT";
var INTERNET = "PROXY 175.45.116.34:18000; DIRECT";
var STUNNEL =  "PROXY 127.0.0.1:31114";
var BYPASS = "DIRECT";


function FindProxyForURL(url, host)
{
  var resolved_ip = dnsResolve(host);
  
  // fix for broken crashplan 4.7
  if (
    (isInNet(resolved_ip, "12.155.41.172", "255.255.255.255")) ||
    (isInNet(resolved_ip, "50.93.246.0", "255.255.254.0")) ||
    (isInNet(resolved_ip, "50.93.255.0", "255.255.255.0")) ||
    (isInNet(resolved_ip, "162.222.40.0", "255.255.248.0")) ||
    (isInNet(resolved_ip, "216.17.8.0", "255.255.255.0")) ||
    (isInNet(resolved_ip, "103.8.239.0", "255.255.255.0")) ||
    (isInNet(resolved_ip, "149.5.44.0", "255.255.255.0")) ||
    (isInNet(resolved_ip, "154.50.20", "255.255.255.0")) ||
    (isInNet(resolved_ip, "117.20.46.94", "255.255.255.224")) ||
    (isInNet(resolved_ip, "216.223.38.0", "255.255.255.0")) ||
    (isInNet(resolved_ip, "149.5.7.0", "255.255.255.128"))
    )
    return BYPASS;
  // end fix for crashplan 4.7
  if ( (dnsDomainIs(host, "gecdn.com")) )
       return STUNNEL;

  if (ipv4addr.test(host) || ipv4addr.test(resolved_ip) || isPlainHostName(host)  )
      return BYPASS;

 // Send specific domains via MyApps immediately for speed
 if (((dnsDomainIs(host, "e2k.ad.ge.com")) ||
      (dnsDomainIs(host, ".private.o365.ge.com")) ||
      (dnsDomainIs(host, "mail.alstom.com")) ||
      (dnsDomainIs(host, "mail.o365.alstom.com")) ||
      (dnsDomainIs(host, "pod51090.outlook.com")) ||
      (dnsDomainIs(host, "pod51098.outlook.com")) ||
      (dnsDomainIs(host, "pod51107.outlook.com")) ||
      (dnsDomainIs(host, "autodiscover.alstom.com")) ||
      (dnsDomainIs(host, ".myapps.ge.com")) ||
      (dnsDomainIs(host, "gecdn.com")) ||
      (dnsDomainIs(host, "mail.geappliances.com")) ||
      (dnsDomainIs(host, "autodiscover.gecompany.mail.onmicrosoft.com")) ||
      (dnsDomainIs(host, "autodiscover.milestoneaviation.com")) ||
      (localHostOrDomainIs(host, "sl.ge")) ) &&
      (url.substring(0,5) == "http:" || url.substring(0,6) == "https:"))
 return STUNNEL;

 // Send specific alstom domains direct
 if ((dnsDomainIs(host, "ad.sys")) ||
     (dnsDomainIs(host, "alstom.com")) ||
     (dnsDomainIs(host, "alstom.ch")) ||
     (dnsDomainIs(host, "eq1als.lan")) ||
     (dnsDomainIs(host, "myloadspring.com")) ||
     (dnsDomainIs(host, "041d.mgd.msft.net")) ||
     (dnsDomainIs(host, "atd.corp")) ||
     (dnsDomainIs(host, "taleo.net")) )
        return BYPASS;

 // Send specific domains direct
 if (
      (host == "ge.com") ||
      (dnsDomainIs(host, "setpac.ge.com")) ||
      (dnsDomainIs(host, "ge-sand.com")) ||
      (dnsDomainIs(host, "stage-sand.com")) ||
      (dnsDomainIs(host, "dev-sand.com")) ||
      (dnsDomainIs(host, "poc-sand.com")) ||
      (dnsDomainIs(host, "gecompany.com")) ||
      (dnsDomainIs(host, "connectge.com")) ||
      (dnsDomainIs(host, "ssogen2.corporate.ge.com")) ||
      (dnsDomainIs(host, "qagen2.corporate.ge.com")) ||
      (dnsDomainIs(host, "registrar.ge.com")) ||
      (dnsDomainIs(host, "blue.ge.com")) ||
      (dnsDomainIs(host, "mvge.ge.com")) ||
      (dnsDomainIs(host, "boxlocalhost.com")) ||
      (dnsDomainIs(host, "www.ge.com")) ||
      (dnsDomainIs(host, "km.ge.com")) ||
      (dnsDomainIs(host, "qa.km.ge.com")) ||
      (dnsDomainIs(host, "mvge.ge.com")) ||
      (dnsDomainIs(host, "ssologin.ge.com")) ||
      (dnsDomainIs(host, "oralogin.ge.com")) ||
      (dnsDomainIs(host, "oamsso.ge.com")) ||
      (dnsDomainIs(host, "stgoralogin.ge.com")) ||
      (dnsDomainIs(host, "oralogin-health.ge.com")) ||
      (dnsDomainIs(host, "fssfed.ge.com")) ||
      (dnsDomainIs(host, "fssfedpitc.ge.com")) ||
      (dnsDomainIs(host, ".mol.gov.sa")) ||
      (dnsDomainIs(host, ".elm.sa")) ||
      (dnsDomainIs(host, "fssauth.ge.com")) ||
      (dnsDomainIs(host, "fssauth.stage.ge.com")) ||
      (dnsDomainIs(host, "ssologin.corporate.ge.com")) ||
      (dnsDomainIs(host, "rsologin.corporate.ge.com")) ||
      (dnsDomainIs(host, "smloginmap.corporate.ge.com")) ||
      (dnsDomainIs(host, "ssousflogin.corporate.ge.com")) ||
      (dnsDomainIs(host, "rsousflogin.corporate.ge.com")) ||
      (dnsDomainIs(host, "smusfloginmap.corporate.ge.com")) ||
      (dnsDomainIs(host, "ssologin.stage.corporate.ge.com")) ||
      (dnsDomainIs(host, "rsologin.stage.corporate.ge.com")) ||
      (dnsDomainIs(host, "smloginmap.stage.corporate.ge.com")) ||
      (dnsDomainIs(host, "ssousflogin.stage.corporate.ge.com")) ||
      (dnsDomainIs(host, "rsousflogin.stage.corporate.ge.com")) ||
      (dnsDomainIs(host, "smusfloginmap.stage.corporate.ge.com")) ||
      (dnsDomainIs(host, "ssologin.stage.ge.com")) ||
      (dnsDomainIs(host, "fssfed.stage.ge.com")) ||
      (dnsDomainIs(host, "jamfcloud.ge.com")) ||
      (dnsDomainIs(host, "wsus.ad.ge.com")) ||
      (dnsDomainIs(host, "crl.ge.com")) ||
      (dnsDomainIs(host, "virtualapps.ge.com")) ||
      (dnsDomainIs(host, "cloudservices.cloud.ge.com")) ||
      (dnsDomainIs(host, "kms.windows7.ge.com")) ||
      (dnsDomainIs(host, "ecommunity.ge.com")) ||
      (dnsDomainIs(host, "helpdesk.ge.com")) ||
      (dnsDomainIs(host, "gesandbox.ge.com")) ||
      (dnsDomainIs(host, "customernet.geappliances.com")) ||
      (dnsDomainIs(host, "w3.assurant.com")) ||
      (dnsDomainIs(host, "ge-tag.custhelp.com")) ||
      (dnsDomainIs(host, "mypassword.ge.com")) ||
      (dnsDomainIs(host, "webexconnect.com")) ||
      (dnsDomainIs(host, "global-nebulau.webex.com")) ||
      (dnsDomainIs(host, "trust.zscalertwo.net")) ||
      (dnsDomainIs(host, "assurant.com")) ||
      (dnsDomainIs(host, "geappliances.com")) ||
      (dnsDomainIs(host, "crashplan.ge.com")) ||
      (dnsDomainIs(host, ".slack.com")) ||
      (dnsDomainIs(host, ".slack-msgs.com")) ||
      (dnsDomainIs(host, "selectconnect.apps.ge.com")) ||
      (dnsDomainIs(host, "mtalk.google.com")) ||
      (dnsDomainIs(host, ".webex.com"))  ||
      (dnsDomainIs(host, ".gecis.io"))  ||
      (dnsDomainIs(host, "geatwork.apps.ge.com")) ||
      (dnsDomainIs(host, ".wurldtech.com"))  ||
      (dnsDomainIs(host, ".meridium.com")) ||
      (dnsDomainIs(host, "biosafe.local")) ||
      (dnsDomainIs(host, ".youtube.com")) ||
      (dnsDomainIs(host, ".netflix.com")) ||
      (dnsDomainIs(host, ".crashplan.com")) ||
      (dnsDomainIs(host, "ip-check.us.mguard.com")) )
        return BYPASS;

// non-bypassed but internet facing ge.com sites
 if (
      (dnsDomainIs(host, "travel.ge.com")) ||
      (dnsDomainIs(host, "go.digital.ge.com")) ||
      (dnsDomainIs(host, "box.ge.com")) ||
      (dnsDomainIs(host, "benefits.ge.com")) ||
      (dnsDomainIs(host, "mytime.ge.com")) ||
      (dnsDomainIs(host, "digitalsupport.ge.com")) ||
      (dnsDomainIs(host, "spo-teamsite.ge.com")) ||
      (dnsDomainIs(host, "spo-mydrive.ge.com")) ||
      (dnsDomainIs(host, "learningcontent.ge.com")) ||
      (dnsDomainIs(host, "myapps.ge.com")) ||
      (dnsDomainIs(host, "eddie.ge.com")) ||
      (dnsDomainIs(host, "fuse.ge.com")) ||
      (dnsDomainIs(host, "fuse-cocreate.ge.com")) ||
      (dnsDomainIs(host, "hmi.digital.ge.com")) ||
      (dnsDomainIs(host, "integrity.ge.com")) ||
      (dnsDomainIs(host, "solutions.mckinsey.com")) ||
      (dnsDomainIs(host, "apphub.apps.ge.com"))
      )
   return INTERNET;

// Send internal ge.com domains via MyApps
if (((dnsDomainIs(host, ".ge.com")) ||
      (dnsDomainIs(host, "stage.jeff.geblogs.com")) ||
      (dnsDomainIs(host, "predix.io")) ||
      (dnsDomainIs(host, "predix.com")) ||
      (dnsDomainIs(host, "vault.geeverywhere.com")) ||
      (dnsDomainIs(host, ".yammer.com")) ||
      (dnsDomainIs(host, ".yammerusercontent.com")) ||
      (dnsDomainIs(host, ".assets-yammer.com"))
      ) )
return STUNNEL;

 // Send remaining traffic direct
 return INTERNET;
}