export interface AppInfo {
  appVersion: string;
  appName: string;
  appAbbr: string;
  appLandingRoute: string;
  appLogoImage: string;
  appColors: string[];
}

export const appVersion = '1.0.0';
export const appName = 'BillFlash';
export const appAbbr = 'BF';
export const appLandingRoute = '/bills';
export const appLogoImage = 'project-flash.png';
export const appColors = ['#f74b5f', '#9493a2', '#71ccd4', '#323552', '#fed130'];
export const appApiUri = 'https://us1.prisma.sh/brad-richardson/billflash-api/dev';

export const appNavItems = [];
