#Name
{{- define "public.name" -}}
{{- default "public" .Values.public.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

#ChartName
{{- define "public.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

#Common Labels
{{- define "public.labels" -}}
helm.sh/chart: {{ include "public.chart" . }}
{{ include "public.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


#Selector labels
{{- define "public.selectorLabels" -}}
app.kubernetes.io/name: {{ include "public.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
