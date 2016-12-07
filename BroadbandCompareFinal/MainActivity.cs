using Android.App;
using Android.OS;
using Android.Views;
using Android.Webkit;

namespace BroadbandCompareFinal
{
    [Activity(Label = "BroadbandCompareFinal", MainLauncher = true, Icon = "@drawable/icon", Theme = "@android:style/Theme.NoTitleBar")]
    public class MainActivity : Activity
    {
        WebView _webView;
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView (Resource.Layout.Main);
            _webView = FindViewById<WebView>(Resource.Id.LocalWebView);
            _webView.Settings.AllowFileAccessFromFileURLs = true;
            _webView.Settings.AllowUniversalAccessFromFileURLs = true;
            _webView.Settings.JavaScriptEnabled = true;
            _webView.LoadUrl("file:///android_asset/index.html");
            _webView.SetWebViewClient(new MyWebViewClient());
        }

        public override bool OnKeyDown(Android.Views.Keycode keyCode, Android.Views.KeyEvent e)
        {
            if (keyCode == Keycode.Back && _webView.CanGoBack())
            {
                _webView.GoBack();
                return true;
            }

            return base.OnKeyDown(keyCode, e);
        }
    }

    public class MyWebViewClient : WebViewClient
    {
        public override bool ShouldOverrideUrlLoading(WebView view, string url)
        {
            view.LoadUrl(url);
            return true;
        }
    }


}

