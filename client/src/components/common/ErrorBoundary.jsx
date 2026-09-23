import React from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[LensCraft Production Error Boundary]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-md w-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-black/80 relative z-10">
            {/* Error Icon */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl font-bold font-serif text-white mb-2 tracking-tight">
              Something went wrong
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Our cinematic engine encountered an unexpected rendering hiccup. Don't worry, your session data is safe.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-sky-500/20 hover:scale-[1.02]"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-sm border border-slate-700/60 transition-all duration-200 hover:scale-[1.02]"
              >
                <Home className="w-4 h-4" />
                Return Home
              </button>
            </div>

            {/* Expandable Technical Details */}
            {this.state.error && (
              <div className="border-t border-slate-800/80 pt-4 text-left">
                <button
                  onClick={this.toggleDetails}
                  className="flex items-center justify-between w-full text-xs text-slate-500 hover:text-slate-400 transition-colors py-1"
                >
                  <span>Technical Diagnostics</span>
                  {this.state.showDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {this.state.showDetails && (
                  <div className="mt-2 p-3 bg-black/50 border border-slate-800 rounded-lg text-xs font-mono text-red-400 overflow-x-auto max-h-40 scrollbar-thin">
                    <p className="font-semibold mb-1">{this.state.error.toString()}</p>
                    {this.state.errorInfo && (
                      <pre className="text-slate-500 text-[10px] whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
