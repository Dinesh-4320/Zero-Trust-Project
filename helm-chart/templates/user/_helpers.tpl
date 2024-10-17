#Name
{{- define "user.name" -}}
{{- default "user" .Values.user.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

#ChartName
{{- define "user.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

#Common Labels
{{- define "user.labels" -}}
helm.sh/chart: {{ include "user.chart" . }}
{{ include "user.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


#Selector labels
{{- define "user.selectorLabels" -}}
app.kubernetes.io/name: {{ include "user.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
